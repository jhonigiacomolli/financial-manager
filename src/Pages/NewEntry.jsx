import './NewEntry.css'
import React, { useState } from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'
import Axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

function MyForm(props) {
    const baseURL = 'http://localhost:3001/releases'
    const [dueDate, setDueDate] = useState(new Date())
    const [paymentDate, setPaymentDate] = useState(new Date())

    class PtLocalizedUtils extends DateFnsUtils {
        getDatePickerHeaderText(date) {
            return format(date, "dd MMMM yyyy", {locale: this.locale})
        }
    }

    function Save(props) {
        props.preventDefault()

        const release = {
            type: document.getElementById('type-select').value,
            category: document.getElementById('category-select').value,
            nf: document.getElementById('nf').value,
            company: document.getElementById('company').value,
            releaseDate: new Date().toLocaleDateString(),
            dueDate: document.getElementById('dueDate').value,
            paymentDate: document.getElementById('paymentDate').value,
            description: document.getElementById('description').value,
            value:  Number(document.getElementById('value').value)
        }

        if(release.type !== "Selecione..." && release.category !== "Selecione..." && release.company && release.value) {
            Axios['post'](baseURL, release).then(resp => {
                toast.success('Lancamento realizado com sucesso')
                clearForm()
            })
        }else {
            toast.error('Preencha todos os campos!')
        }

    }

    function clearForm() {
        document.getElementById('type-select').value = 0
        document.getElementById('category-select').value = 0
        document.getElementById('nf').value = ''
        document.getElementById('company').value = ''
        setDueDate(new Date())
        setPaymentDate(new Date())
        document.getElementById('description').value = ''
        document.getElementById('value').value = ''
    }

    return (
        <div className="new-entry">
            <h1>Cadastro de Entrada</h1>
            <form action="post" className="entry">
                <label>Tipo de Lançamento</label>
                <select name="type" id="type-select">
                    <option value="0">Selecione...</option>
                    <option value="eventual">Eventual</option>
                    <option value="recorrente">Recorrente</option>
                </select>
                <label>Categoria</label>
                <select name="category" id="category-select">
                    <option value="0">Selecione...</option>
                    <option value="aporte">Aporte</option>
                    <option value="despesa">Despesa</option>
                    <option value="receita">Receita</option>
                </select>
                <label>Numero de NFe</label>
                <input type="text" id="nf" name="nf" className="text-left"/>
                <label>Empresa Emissora</label>
                <input type="text" id="company" name="company" className="text-left"/>
                <MuiPickersUtilsProvider locale={ptBR} utils={PtLocalizedUtils}>
                    <KeyboardDatePicker 
                        id="dueDate"
                        className="date-picker"
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Data de Vencimento"
                        format="dd/MM/yyyy"
                        InputAdornmentProps={{ position: "start" }}
                        value={dueDate} 
                        onChange={setDueDate} 
                    />
                    <KeyboardDatePicker 
                        id="paymentDate"
                        className="date-picker"
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Data de Pagamento"
                        format="dd/MM/yyyy"
                        InputAdornmentProps={{ position: "start" }}
                        value={paymentDate} 
                        onChange={setPaymentDate} 
                    />
                </MuiPickersUtilsProvider>
                <label>Descrição</label>
                <input type="text" id="description" name="description" className="text-left"/>
                <label>Valor</label>
                <input type="text" id="value" name="value" className="text-left"/>
                <input type="button" className="send" value="Salvar" onClick={(e) => Save(e)}/>
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
            </form>
        </div>
    )
}

export default MyForm