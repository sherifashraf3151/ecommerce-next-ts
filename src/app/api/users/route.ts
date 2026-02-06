import { NextResponse } from "next/server"

export async function GET() {
  const users = {
    message: 'success',
    users: [
      { id: 111, name: 'ahmed', age: 20 },
      { id: 121, name: 'ali', age: 32 },
      { id: 131, name: 'khaled', age: 13 },
    ]
  }
  return NextResponse.json(users)
}