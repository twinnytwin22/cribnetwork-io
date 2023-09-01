import { calculateTax } from "@/lib/hooks/calculateTax";



export async function POST(req:Request){
    const { items } = await req.json()
    const  taxCalculation = calculateTax(items);


}