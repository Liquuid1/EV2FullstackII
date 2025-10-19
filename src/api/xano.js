import axios from "axios";

const SNKR_BASE = import.meta.env.VITE_XANO_STORE_BASE;

export const makeAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export async function createProduct(token, payload) {
  const { data } = await axios.post(
    `${SNKR_BASE}/product`,
    payload,
    { 
      headers: { 
        ...makeAuthHeader(token),
        "Content-Type": "application/json"
      } 
    }
  );
  return data;
}

export async function uploadImages(token, files) {
  const fd = new FormData();

  for (const f of files) fd.append("content[]", f);       

  const { data } = await axios.post(
    `${STORE_BASE}/upload/image`, //aqui hay que modificar el endpoint para el que nosotros creemos para subir imagenes
    fd,
    { 
      headers: { 
        Authorization: `Bearer ${token}`
      } 
    }
  );
  const arr = Array.isArray(data) ? data : (data.files || []);
  return arr;
}

export async function attachImagesToProduct(token, productId, imagesFullArray) {
  const { data } = await axios.patch(
    `${STORE_BASE}/product/${productId}`,
    { images: imagesFullArray },
    { 
      headers: { 
        ...makeAuthHeader(token),
        "Content-Type": "application/json"
      } 
    }
  );
  return data; // Devolvemos los datos actualizados del producto
}

export async function listProducts({ token, limit = 12, offset = 0, q = "" } = {}) {

  const params = {};

  if (limit != null) params.limit = limit;
  if (offset != null) params.offset = offset;
  if (q) params.q = q;

  const { data } = await axios.get(`${STORE_BASE}/product`, {
    headers: { ...makeAuthHeader(token) },
    params,
  });


  return Array.isArray(data) ? data : (data?.items ?? []);
}
