import './Content.css'
import React from 'react'
import BoxTotals from '../components/utilitaries/Box_Totals'
import TableData from '../components/utilitaries/TableData'

function myContent() {
    return (
        <main className="content">
            <BoxTotals />
            <TableData />
        </main>
    )
}

export default myContent