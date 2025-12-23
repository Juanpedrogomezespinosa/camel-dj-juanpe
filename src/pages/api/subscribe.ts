import type { APIRoute } from "astro";

// ESTA LÍNEA ES LA SOLUCIÓN:
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Intentamos leer el JSON. Si la petición viene vacía, esto fallará controladamente.
    const data = await request.json();
    const { email } = data;

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ message: "Email inválido" }), {
        status: 400,
      });
    }

    const apiKey = import.meta.env.BREVO_API_KEY;
    const listId = Number(import.meta.env.BREVO_LIST_ID);

    if (!apiKey || !listId) {
      console.error("Faltan las credenciales de BREVO en el .env");
      return new Response(
        JSON.stringify({ message: "Error de configuración en el servidor" }),
        { status: 500 }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de Brevo:", errorData);
      return new Response(
        JSON.stringify({
          message: "Error al suscribir. Puede que ya estés en la lista.",
        }),
        { status: response.status } // Devuelve el estado real (ej: 400 o 500)
      );
    }

    return new Response(
      JSON.stringify({ message: "¡Suscrito correctamente!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor o JSON inválido" }),
      { status: 500 }
    );
  }
};
