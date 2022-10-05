import { ThemeOptions } from '@mui/material';
import Colors from '@colors';
import UTILS from '../utils';
// Добавили в createTheme
// declare module '@material-ui/core/styles/createTypography' {
//   interface TypographyOptions {
//     caption2: CSSProperties;
//     caption3: CSSProperties;
//   }
//   interface Typography {
//     caption2: CSSProperties;
//     caption3: CSSProperties;
//   }
// }



const typography: ThemeOptions['typography'] = {
  fontFamily: ['Montserrat'],
  allVariants: {
    fontStyle: 'normal',
    fontWeight: 500,
    textTransform: 'none',
  },
  // Прям название сайта
  h1: {
    fontWeight: 700,
    fontSize: UTILS.getInPx(32),
    lineHeight: UTILS.getInPx(36),
  },
  // заголовок 1-го уровня
  h2: {
    fontWeight: 600,
    fontSize: UTILS.getInPx(20),
    lineHeight: UTILS.getInPx(22),
  },
  // заголовок 2-го уровня
  subtitle1: {
    fontSize: UTILS.getInPx(18),
    lineHeight: UTILS.getInPx(20),
  },
  // заголовок 3 уровня
  subtitle2: {
    fontSize: UTILS.getInPx(14),
    lineHeight: UTILS.getInPx(10),
  },
  // Текст в карточках
  body1: {
    fontWeight: 400,
    fontSize: UTILS.getInPx(14),
    lineHeight: UTILS.getInPx(20),
  },
  body2: {
    fontWeight: 400,
    fontSize: UTILS.getInPx(14),
    lineHeight: UTILS.getInPx(18),
  },
  button: {
    fontWeight: 300,
    fontSize: UTILS.getInPx(14),
    lineHeight: UTILS.getInPx(16),
  },
  // лейблы к инпутам
  caption: {
    fontWeight: 300,
    fontSize: UTILS.getInPx(12),
    lineHeight: UTILS.getInPx(14),
  },
  
  // Всякие Badge ну тип уведомления
  h5: {
    fontWeight: "bold",
    fontSize: UTILS.getInPx(12),
    lineHeight: UTILS.getInPx(14),
  },
  // Тултипчики
  h6: {
    fontSize: UTILS.getInPx(12),
    lineHeight: UTILS.getInPx(14),
  },

};

export default typography;
