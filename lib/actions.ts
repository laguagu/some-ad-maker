"use server";

export async function removeBackGroundAction(
  formData: FormData,
  alpha_matting: boolean = false, // Pehmeämmän reunan saamiseksi jos True
): Promise<string> {
  formData.append("alpha_matting", alpha_matting.toString());

  const response = await fetch(
    "http://localhost:8000/remove-background-base64/",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Taustan poisto epäonnistui");
  }

  const { image } = await response.json();
  return `data:image/png;base64,${image}`;
}

