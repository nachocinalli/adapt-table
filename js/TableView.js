import ComponentView from 'core/js/views/componentView';

class TableView extends ComponentView {
  postRender() {
    this.setReadyStatus();
    this.setupInviewCompletion();
  }
}

TableView.template = 'table.jsx';

export default TableView;
