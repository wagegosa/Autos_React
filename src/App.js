import logo from './logo.svg';
import './App.css';
import { autosService } from './service/autosService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      auto: {
        id: null,
        Marca: null,
        color: null,
        Numero_pasajeros: null,
        placa : null
      },
      selectedauto : {

      }
    };
    this.items = [
      {
        label : 'Nuevo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.autosService = new autosService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.autosService.getAll().then(data => this.setState({autos: data}))
  }

  save() {
    this.autosService.save(this.state.auto).then(data => {
      this.setState({
        visible : false,
        auto: {
          id: null,
          Marca: null,
          color: null,
          Numero_pasajeros: null,
          placa : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.autosService.getAll().then(data => this.setState({autos: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.autosService.delete(this.state.selectedauto.id).then(data => {
        this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.autosService.getAll().then(data => this.setState({autos: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="React CRUD App">
            <DataTable value={this.state.autos} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedauto} onSelectionChange={e => this.setState({selectedauto: e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="marca_Auto" header="Marca"></Column>
              <Column field="color" header="Color"></Column>
              <Column field="numero_pasajeros" header="Numero Pasajeros"></Column>
              <Column field="placa" header="Placa"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear auto" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="auto-form">
              <span className="p-float-label">
                <InputText value={this.state.auto.Marca} style={{width : '100%'}} id="Marca" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let auto = Object.assign({}, prevState.auto);
                        auto.Marca = val;

                        return { auto };
                    })}
                  } />
                <label htmlFor="Marca">Marca</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.auto.color} style={{width : '100%'}} id="color" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let auto = Object.assign({}, prevState.auto);
                        auto.color = val

                        return { auto };
                    })}
                  } />
                <label htmlFor="color">Color</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.auto.Numero_pasajeros} style={{width : '100%'}} id="Numero_pasajeros" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let auto = Object.assign({}, prevState.auto);
                        auto.Numero_pasajeros = val

                        return { auto };
                    })}
                  } />
                <label htmlFor="Numero_pasajeros">Numero Pasajeros</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.auto.placa} style={{width : '100%'}} id="placa" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let auto = Object.assign({}, prevState.auto);
                        auto.placa = val

                        return { auto };
                    })}
                  } />
                <label htmlFor="placa">Placa</label>
              </span>
            </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      auto : {
        id: null,
        Marca: null,
        color: null,
        Numero_pasajeros: null,
        placa : null
      }
    });
    document.getElementById('auto-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      auto : {
        id: this.state.selectedauto.id,
        Marca: this.state.selectedauto.Marca,
        color: this.state.selectedauto.color,
        Numero_pasajeros: this.state.selectedauto.Numero_pasajeros,
        placa : this.state.selectedauto.placa
      }
    })
  }
}
