import './TableData.css'
import React, { Component } from 'react'
import Axios from 'axios'
import Filter from './Filter'
import {ToastContainer, toast} from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert';
import { format } from 'date-fns'
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import subDays from 'date-fns/subDays'
import { ptBR } from 'date-fns/locale'

const baseURL = 'http://localhost:3001/'

export default class RenderTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            releases: {
                id: '',
                type: '',
                category: '',
                nf: 0,
                company: '',
                releaseDate: '',
                dueDate: '',
                paymentDate: '',
                description: '',
                value: '',
            },
            list: [],
            original: []
        }
    }  
    
    componentDidMount() {
        Axios(`${baseURL}releases`)
        .then(resp => {
            this.setState({original: resp.data})    
            this.UpdateTable()
        })
    }

    LastRelease () {
        const lastIncome = this.state.original.filter(resp => resp.category === 'aporte' || resp.category === 'receita').slice(-1)
        const incomeSplit = lastIncome[0].releaseDate.split('/')
        const usIncome = `${incomeSplit[1]}/${incomeSplit[0]}/${incomeSplit[2]}`
        
        const lastExpense = this.state.original.filter(resp => resp.category === 'despesa' )
                                                .slice(-1)
        const expenseSplit = lastExpense[0].releaseDate.split('/')
        const usExpense = `${expenseSplit[1]}/${expenseSplit[0]}/${expenseSplit[2]}`
                                                
        document.getElementById('last-income').innerHTML = format( Date.parse(usIncome), "EEE, dd MMMM yyyy", {locale: ptBR})
        document.getElementById('last-expense').innerHTML = format(Date.parse(usExpense), "EEE, dd MMMM yyyy", {locale: ptBR})

    }

    SomaTotals() {
        const releases = this.state.original

        try{
            let income = 0
            releases.filter(resp => resp.category === "aporte" || resp.category === "receita")
                    .map(resp => income += resp.value)

            let expense = 0
            releases.filter(resp => resp.category === "despesa")
                    .map(resp => expense += resp.value)

            let total = income - expense

            document.getElementById('total-value').innerHTML = `<span> ${total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span>`
        }catch{
            alert('Nenhum lançamento para ser exibido')
        }
    }

    SomaLastTotals() {
        const startDate = this.ConvertToUsDate(subDays(new Date(), 30).toLocaleDateString())
        const endDate = this.ConvertToUsDate(new Date().toLocaleDateString())

        const releases = this.state.original.filter(resp => startDate <= this.ConvertToUsDate(resp.paymentDate))
                                            .filter(resp => endDate >= this.ConvertToUsDate(resp.paymentDate))
        try{
            let income = 0
            releases.filter(resp => resp.category === "aporte" || resp.category === "receita")
                    .map(resp => income += resp.value)

            let expense = 0
            releases.filter(resp => resp.category === "despesa")
                    .map(resp => expense += resp.value)

            document.getElementById('last-entries').innerHTML = `<span> ${income.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span>`
            document.getElementById('last-expenses').innerHTML = `<span> ${expense.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span>`

        }catch{
            alert('Nenhum lançamento para ser exibido')
        }
    }

    UpdateTable(propStart, propEnd) {
        const type =  document.getElementById('selectedType').value
        const category = document.getElementById('selectedCategory').value
        const filter = document.getElementById('selectedFilter').value
        const start = propStart ? this.ConvertToUsDate(propStart) : this.ConvertToUsDate(document.getElementById('initialDate').value)
        const end =  propEnd ? this.ConvertToUsDate(propEnd) : this.ConvertToUsDate(document.getElementById('finalDate').value)
        
        let filteredData = null
        if(start <= end) {
            filteredData = this.state.original
                if(type !== 'all') {
                    filteredData = filteredData.filter(resp => type === resp.type)
                }
                if(category !== 'all') {
                    filteredData = filteredData.filter(resp => category === resp.category)
                }
                if(filter === 'releaseDate'){
                filteredData = filteredData.filter(resp => start <=  this.ConvertToUsDate(resp.releaseDate))
                                            .filter(resp => end >= this.ConvertToUsDate(resp.releaseDate))
                }
                if(filter === 'dueDate') {
                    filteredData = filteredData.filter(resp => start <=  this.ConvertToUsDate(resp.dueDate))
                                                .filter(resp => end >= this.ConvertToUsDate(resp.dueDate))
                }
                if(filter === 'paymentDate'){
                    filteredData = filteredData.filter(resp => start <=  this.ConvertToUsDate(resp.paymentDate))
                                                .filter(resp => end >= this.ConvertToUsDate(resp.paymentDate))
                }
                this.setState({list: filteredData})

                this.SomaLastTotals()
                this.SomaTotals()
                this.LastRelease()
        }else {
            toast.error('A data inicial deve ser maior do que a data final')   
        } 
    }
    
    ConvertToUsDate(date) {
        const dateSplit = date.split("/");
        const usDate = `${dateSplit[2]}${dateSplit[1]}${dateSplit[0]}`
        return usDate
    }
    
    messageAlert = (release) => {
        confirmAlert({
            title: 'Excluir Item',
            message: 'Deseja relamente excluir este item ?',
            buttons: [{
                label: 'Sim',
                onClick: () => this.RemoveRelease(release)
            },  {
                label: 'Não'
            }]
        })
    }

    RemoveRelease(release) {
        Axios.delete(`${baseURL}release/?id=${release.id}`, release).then(resp => {
            toast.success('Lançamento removido com sucesso!')
            this.setState({
                list: this.state.list.filter(resp => resp.id !== release.id),
                original: this.state.original.filter(resp => resp.id !== release.id)
            })
        })
    }

    CreateTable() {
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Nº NFe</th>
                        <th>Emissor</th>
                        <th>Lançamento</th>
                        <th>Vencimento</th>
                        <th>Pagamento</th>
                        <th>Descrição</th>
                        <th className="table-center">Valor</th>
                        <td className="table-center">Ações</td>
                    </tr>
                </thead>
                <tbody className="table-data-body">
                    {this.CreateRows()}
                </tbody>
            </table>
        )
    }

    CreateRows() {
        return this.state.list.map(data => {
            return (
                <tr key={data.id} className={data.category}>
                    <td>{data.type}</td>
                    <td>{data.category}</td>
                    <td>{data.nf}</td>
                    <td>{data.company}</td>
                    <td>{data.releaseDate}</td>
                    <td>{data.dueDate}</td>
                    <td>{data.paymentDate}</td>
                    <td>{data.description}</td>
                    <td className="detach table-center">{Number(data.value).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                    <td className="actions table-center">
                        {/* <button className="action">
                            <i className="fa fa-edit" ></i>
                        </button> */}
                        <button className="action" onClick={() => this.messageAlert(data)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="list-table">
                <Filter 
                    updateTable={this.UpdateTable.bind(this)}          
                />
                {this.CreateTable()}
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    
            </div>
        );
    }
}