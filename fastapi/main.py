from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove, new_session
from PIL import Image, UnidentifiedImageError
import io
import base64
from typing import Optional

app = FastAPI()

# CORS-middleware konfiguraatio
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp"}

# Luodaan rembg-sessio sovelluksen käynnistyessä
session = new_session()

# Kiinteät alpha matting -arvot
ALPHA_MATTING_FOREGROUND_THRESHOLD = 240  # Voit säätää tätä arvoa (0-255)
ALPHA_MATTING_BACKGROUND_THRESHOLD = 10   # Voit säätää tätä arvoa (0-255)


def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.post("/remove-background/")
async def remove_background(
    file: UploadFile = File(...),
    alpha_matting: Optional[bool] = Form(False)
):
    if not allowed_file(file.filename):
        raise HTTPException(
            status_code=400, detail="Tiedostomuoto ei ole tuettu. Tuetut muodot: PNG, JPG, JPEG, GIF, BMP")

    try:
        contents = await file.read()
        input_image = Image.open(io.BytesIO(contents))

        output_image = remove(
            input_image,
            session=session,
            alpha_matting=alpha_matting,
            alpha_matting_foreground_threshold=ALPHA_MATTING_FOREGROUND_THRESHOLD if alpha_matting else None,
            alpha_matting_background_threshold=ALPHA_MATTING_BACKGROUND_THRESHOLD if alpha_matting else None
        )

        img_byte_arr = io.BytesIO()
        output_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)

        return StreamingResponse(img_byte_arr, media_type="image/png")
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400, detail="Kuvatiedostoa ei voitu tunnistaa")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Virhe käsiteltäessä kuvaa: {str(e)}")


@app.post("/remove-background-base64/")
async def remove_background_base64(
    file: UploadFile = File(...),
    alpha_matting: Optional[bool] = Form(False)
):
    if not allowed_file(file.filename):
        raise HTTPException(
            status_code=400, detail="Tiedostomuoto ei ole tuettu. Tuetut muodot: PNG, JPG, JPEG, GIF, BMP")

    try:
        contents = await file.read()
        input_image = Image.open(io.BytesIO(contents))

        output_image = remove(
            input_image,
            session=session,
            alpha_matting=alpha_matting,
            alpha_matting_foreground_threshold=ALPHA_MATTING_FOREGROUND_THRESHOLD if alpha_matting else None,
            alpha_matting_background_threshold=ALPHA_MATTING_BACKGROUND_THRESHOLD if alpha_matting else None
        )

        buffered = io.BytesIO()
        output_image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return JSONResponse(content={"image": img_str})
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400, detail="Kuvatiedostoa ei voitu tunnistaa")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Virhe käsiteltäessä kuvaa: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
