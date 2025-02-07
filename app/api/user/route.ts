import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "users.json")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const users = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
  const user = users[userId]

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function POST(request: Request) {
  const data = await request.json()
  const { userId, userData } = data

  if (!userId || !userData) {
    return NextResponse.json({ error: "User ID and data are required" }, { status: 400 })
  }

  let users = {}
  if (fs.existsSync(DATA_FILE)) {
    users = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
  }

  users[userId] = userData
  fs.writeFileSync(DATA_FILE, JSON.stringify(users))

  return NextResponse.json({ message: "User data saved successfully" })
}

