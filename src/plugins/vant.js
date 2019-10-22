import Vue from 'vue'
import {
  Row,
  Col,
  Cell,
  CellGroup,
  Button,
  Tag
} from 'vant'
const vantComponents = {
  Row,
  Col,
  Cell,
  CellGroup,
  Button,
  Tag
}

Object.keys(vantComponents).forEach((key) => {
  Vue.use(vantComponents[key])
})
