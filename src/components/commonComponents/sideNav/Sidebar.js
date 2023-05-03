import { CalendarMonthOutlined, GroupWorkOutlined, HomeOutlined, PostAddOutlined } from "@mui/icons-material"
import "./sidebar.css"

import { Link, useMatch, useResolvedPath } from "react-router-dom"

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <img src="https://preparecenter.org/wp-content/uploads/2021/04/google-_square_logo.jpeg" alt="" className="companyImage" />
                <div className="companyTitle">Google</div>
                
                <ul className="optionsList">

                <CustomLink to='/'> <li className="option"><HomeOutlined className="optionsIcon"/>  Home  </li> </CustomLink>
                    <li className="option"><PostAddOutlined className="optionsIcon"/><a href="/Company-List-Page" className="optionLink">company List</a></li>
                    <li className="option"><CalendarMonthOutlined className="optionsIcon"/><a href="/hr_admin" className="optionLink">HR Admins List</a></li>
                    <li className="option"><GroupWorkOutlined className="optionsIcon"/><a href="" className="optionLink">Candidates</a></li>
                    <li className="option"><GroupWorkOutlined className="optionsIcon"/><a href="" className="optionLink"> Jobs </a></li>
                </ul>
            </div>
        </div>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

export default Sidebar