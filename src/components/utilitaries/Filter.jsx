import './Filter.css'
import  React ,  { Component }  from  'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import subDays  from 'date-fns/subDays'
import { format } from 'date-fns'
import  "react-datepicker/dist/react-datepicker.css"

class PtLocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "dd MMMM yyyy", {locale: this.locale})
    }
}

class FilterData extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            startDate: subDays(new Date(),30),
            endDate: new Date(),
        };
        this.selectType = {
            value: '0',
        }
        this.selectCategory = {
            value: '0',
        }
    }

    updateDate( initialDate, finalDate ) {   
        if (initialDate && initialDate) { this.setState({ startDate: initialDate }) }
        if (finalDate) { this.setState({ endDate: finalDate }) }
    }

    render() {
        return(
            <div>
                <div className="filter-data">
                    <div className="filter-select">
                        <label htmlFor="selectedType">Exibir Tipo</label>
                        <select name="selectedType" id="selectedType" onChange={() => this.props.updateTable()} >
                            <option value="all">Todos</option>
                            <option value="eventual">Eventuias</option>
                            <option value="recorrente">Recorrentes</option>
                        </select>
                    </div>
                    <div className="filter-select">
                        <label htmlFor="selectedCategory">Exibir Categoria</label>
                        <select name="selectedCategory" id="selectedCategory" onChange={() => this.props.updateTable()}>
                            <option value="all">Todas</option>
                            <option value="aporte">Aportes</option>
                            <option value="despesa">Despesas</option>
                            <option value="receita">Receitas</option>
                        </select>
                    </div>
                    <div className="filter-select">
                        <label htmlFor="selectedFilter">Filtrar por Data:</label>
                        <select name="selectedFilter" id="selectedFilter" onChange={() => this.props.updateTable()}>
                            <option value="releaseDate">Lançamento</option>
                            <option value="dueDate">Vencimento</option>
                            <option value="paymentDate">Pagamento</option>
                        </select>
                    </div>
                    <div>
                            <MuiPickersUtilsProvider locale={ptBR} utils={PtLocalizedUtils}>
                                <KeyboardDatePicker
                                    id="initialDate" 
                                    autoOk
                                    className="date-picker"
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Inicio"
                                    format="dd/MM/yyyy"
                                    InputAdornmentProps={{ position: "start" }}
                                    value={this.state.startDate} 
                                    onChange={async e => {
                                        await this.updateDate(e, this.state.endDate)
                                        await this.props.updateTable(this.props.updateTable(e.toLocaleDateString(), this.state.endDate.toLocaleDateString()))
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider locale={ptBR} utils={PtLocalizedUtils}>
                                <KeyboardDatePicker 
                                    id="finalDate"
                                    autoOk
                                    className="date-picker"
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Fim"
                                    format="dd/MM/yyyy"
                                    InputAdornmentProps={{ position: "start" }}
                                    value={this.state.endDate} 
                                    onChange={async e => {
                                        await this.updateDate(this.state.startDate, e)
                                        await this.props.updateTable(this.props.updateTable(this.state.startDate.toLocaleDateString(), e.toLocaleDateString()))
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterData