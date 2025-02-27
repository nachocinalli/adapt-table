import components from 'core/js/components';
import TableView from './TableView';
import TableModel from './TableModel';

export default components.register('table', {
  model: TableModel,
  view: TableView
});
