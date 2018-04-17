import { connect } from 'react-redux'
import NavBar, { NavBarProps } from './NavBar'

const mapStateToProps = ({ user }: RootState): NavBarProps => ({
  user
})

export default connect(mapStateToProps, () => ({}))(NavBar)