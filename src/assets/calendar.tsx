import { h } from 'preact'

type CalendarPropsType = {
  height?: number
  width?: number
  fill?: string
}

export const Calendar = ({ height, width, fill }: CalendarPropsType) => (
  <svg
    clip-rule="evenodd"
    fill-rule="evenodd"
    stroke-linejoin="round"
    stroke-miterlimit="2"
    width={width || 20}
    height={height || 21}
    viewBox="0 0 34 36"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill || '#000'}
  >
    <path
      d="m25.763 0c.744 0 1.341.594 1.354 1.341v.023.834h2.595c2.383 0 4.287 1.931 4.288 4.286l-.001.072v25.086c0 2.364-1.916 4.319-4.254 4.357l-.071.001h-25.349c-2.346 0-4.286-1.931-4.324-4.286l-.001-.072v-25.048c0-2.364 1.917-4.319 4.254-4.358h.071 2.595v-.872c0-.758.602-1.364 1.354-1.364.745 0 1.342.594 1.354 1.341v.023.872h6.055v-.872c0-.758.602-1.364 1.354-1.364.745 0 1.342.594 1.354 1.341v.023.872h6.018v-.872c0-.758.602-1.364 1.354-1.364zm5.566 11.861h-28.621v19.781c0 .901.737 1.653 1.628 1.668h.027 25.349c.893 0 1.64-.743 1.618-1.64l-.001-.028zm-21.062 15.499c.595 0 1.08.481 1.091 1.078v.021 1.175c0 .599-.477 1.087-1.069 1.099h-.022-3.272c-.594 0-1.079-.481-1.09-1.078v-.021-1.175c0-.599.477-1.087 1.069-1.099h.021zm16.775 0c.632 0 1.117.482 1.128 1.078v.021 1.175c0 .599-.478 1.087-1.07 1.098l-.021.001h-3.272c-.594 0-1.079-.481-1.09-1.078v-.021-1.175c0-.599.477-1.087 1.069-1.099h.021zm-8.387 0c.594 0 1.079.481 1.09 1.078v.021 1.175c0 .599-.477 1.087-1.069 1.098l-.021.001h-3.272c-.595 0-1.079-.481-1.091-1.078v-.021-1.175c0-.599.477-1.087 1.069-1.099h.022zm-8.388-6.404c.595 0 1.08.481 1.091 1.078v.021 1.175c0 .599-.477 1.087-1.069 1.098l-.022.001-3.272-.001c-.594 0-1.079-.481-1.09-1.077v-.022-1.174c0-.599.477-1.087 1.069-1.099h.021zm16.775 0c.632 0 1.117.481 1.128 1.078v.021 1.174c0 .599-.478 1.088-1.07 1.099h-.021-3.272c-.594 0-1.079-.481-1.09-1.077v-.022-1.174c0-.599.477-1.087 1.069-1.099h.021zm-8.387 0c.594 0 1.079.481 1.09 1.077v.022 1.174c0 .599-.477 1.088-1.069 1.099h-.021-3.272c-.595 0-1.079-.481-1.091-1.077v-.022-1.174c0-.599.477-1.087 1.069-1.099h.022zm-8.388-6.366c.595 0 1.08.481 1.091 1.077v.022 1.174c0 .599-.477 1.088-1.069 1.099h-.022-3.272c-.594 0-1.079-.481-1.09-1.078v-.021-1.175c0-.599.477-1.087 1.069-1.098h.021zm16.775 0c.632 0 1.117.481 1.127 1.077l.001.021v1.175c0 .599-.478 1.087-1.07 1.099h-.021-3.272c-.595 0-1.079-.481-1.09-1.078l-.001-.021.001-1.175c0-.599.477-1.087 1.069-1.098h.021zm-8.387 0c.594 0 1.079.481 1.09 1.077v.021 1.175c0 .599-.477 1.087-1.069 1.099h-.021-3.272c-.595 0-1.079-.481-1.091-1.078v-.021-1.175c0-.599.477-1.087 1.069-1.098h.022zm-11.697-9.664h-2.595c-.894 0-1.64.706-1.655 1.639v2.606h28.734v-2.577c0-.901-.737-1.652-1.628-1.667l-.027-.001h-2.595v.872c0 .758-.602 1.364-1.354 1.364-.744 0-1.341-.594-1.354-1.34v-.024-.872h-6.055v.872c0 .758-.602 1.364-1.354 1.364-.744 0-1.341-.594-1.354-1.34v-.024-.872h-6.055v.872c0 .758-.602 1.364-1.354 1.364-.744 0-1.342-.594-1.354-1.34v-.024z"
      fill-rule="nonzero"
    />
  </svg>
)
