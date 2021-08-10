import './Box_Totals.css'
import React from 'react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

function boxTotal() {
    return (
        <div className="totals">
            <div className="total-box current-balance">
                <h1>Saldo Atual</h1>
                <p className="last-update">
                    <span className="date">{ format( new Date(), "EEE, dd MMMM yyyy", {locale: ptBR}) }</span> 
                    <span className="time">{ format( new Date(), "k : mm : ss", {locale: ptBR}) }</span>
                </p>
                <div>
                    <p id="total-value" className="value"><span> R$ 0,00</span></p>  
                </div>
            </div>
            <div className="total-box total-last-payments">
                <h1>Total de Entradas</h1>
                <p className="last-update">
                    Ultimo lançamento: 
                    <span id="last-income" className="date">{ format( new Date(), "EEE, dd MMMM yyyy", {locale: ptBR}) }</span>  
                </p>
                <div>
                    <p id="last-entries" className="value"><span>R$ 0,00</span></p>  
                    <p className="note">Ultimos 30 dias</p>
                </div>
            </div>
            <div className="total-box total-last-entries">
            <h1>Total de Pagamentos</h1>
                <p className="last-update">
                    Ultimo lançamento: 
                    <span id="last-expense" className="date">{ format( new Date(), "EEE, dd MMMM yyyy", {locale: ptBR}) }</span>  
                </p>
                <div>
                    <p id="last-expenses" className="value"><span>R$ 0,00</span></p>  
                    <p className="note">Ultimos 30 dias</p>
                </div>
            </div>
        </div>
    )
}

export default boxTotal