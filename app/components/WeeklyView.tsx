"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface FoodItem {
  id: string
  name: string
  calories: number
  amount: number
}

interface WeeklyViewProps {
  foodEntries: FoodItem[]
}

export default function WeeklyView({ foodEntries }: WeeklyViewProps) {
  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const weekData = days.map((day) => ({ day, calories: 0 }))

    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))

    foodEntries.forEach((entry) => {
      const entryDate = new Date()
      const dayIndex = entryDate.getDay()
      if (entryDate >= startOfWeek) {
        weekData[dayIndex].calories += entry.calories * entry.amount
      }
    })

    return weekData
  }, [foodEntries])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly View</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

