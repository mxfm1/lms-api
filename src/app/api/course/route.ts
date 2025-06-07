// /src/app/api/course/route.ts

export const runtime = 'edge'

// export async function POST(req: Request) {
//   const body = await req.json()
//   console.log("POST /api/course received:", body)
//   return new Response(JSON.stringify({ message: "ok", data: body }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" }
//   })
// }


export async function POST(req:Request){
    try{
        const body = await req.json()
        console.log("API CONTENT",body)
        return new Response(JSON.stringify({message:'ok',data:body}))
    }catch(error){
        console.log('Error')
        return new Response()
    }
}