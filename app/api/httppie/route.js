import axios from "axios";
 
export async function POST(request) {
  try {
    const { url, method = "GET", headers = {}, params = {}, body = null, auth = null } = await request.json();
 
    const axiosConfig = {
      method,
      url,
      headers,
      params,
      data: body,
      auth,
      validateStatus: () => true,
    };
 
    const response = await axios(axiosConfig);
    console.log('response',response);
 
    return Response.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
    }, { status: response.status });
  } catch (error) {
    return Response.json({ error: error.toString() }, { status: 500 });
  }
}