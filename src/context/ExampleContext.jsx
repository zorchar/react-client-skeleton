import React, { createContext, useContext, useEffect, useReducer } from "react";
import { setCourses } from "../actions/coursesActions";
import { getAllCourses } from "../api/professorsAPI";
import coursesReducer from "../reducers/coursesReducer";
import { LoginContext } from "./LoginContext";

export const CoursesContext = createContext()

const CoursesContextProvider = ({ children }) => {
    const { loginState } = useContext(LoginContext)

    const initialCoursesState = {
        courses: 'pending',
        currentCourse: 'pending',
        lastClickedClassDate: 'pending'
    }

    const [coursesState, coursesDispatch] = useReducer(coursesReducer, initialCoursesState)

    useEffect(() => {
        const asyncData = async () => {
            const coursesFromDB = await getAllCourses()
            coursesDispatch(setCourses(coursesFromDB))
        }

        if (loginState.user)
            asyncData()
    }, [loginState])

    return (
        <CoursesContext.Provider value={{ coursesState, coursesDispatch }}>
            {children}
        </CoursesContext.Provider>
    )
}

export default CoursesContextProvider