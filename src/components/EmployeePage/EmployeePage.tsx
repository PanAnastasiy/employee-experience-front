import React from 'react'
import {useNavigation} from "../utils/UseNavigation";
import EmployeeTable from "./EmployeeTable/EmployeeTable";

export default function EmployeePage() {
    const { navigateTo } = useNavigation();

    return (
        <div>
            <h1>Данные о сотрудниках</h1>
          <EmployeeTable></EmployeeTable>
        </div>
    );
}