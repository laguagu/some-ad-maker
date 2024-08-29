"use server";

export async function removeBackGroundAction(fileBuffer: ArrayBuffer) {
  const formData = new FormData();
  formData.append("file", new Blob([fileBuffer]));

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
