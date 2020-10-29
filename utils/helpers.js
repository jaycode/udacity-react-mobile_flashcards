import { standout, white } from "../utils/colors"

export function headerStyle (title) {
  return {
    title: title,
    headerStyle: {
      backgroundColor: standout
    },
    headerTintColor: white,
    headerTitleStyle: {
      fontWeight: "normal"
    }
  }
}
