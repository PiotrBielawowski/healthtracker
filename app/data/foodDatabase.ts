export interface FoodItem {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image: string
}

export const foodDatabase: FoodItem[] = [
  {
    id: 1,
    name: "Apple",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Banana",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.3,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Salmon",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Broccoli",
    calories: 55,
    protein: 3.7,
    carbs: 11.2,
    fat: 0.6,
    image: "/placeholder.svg?height=100&width=100",
  },
]

