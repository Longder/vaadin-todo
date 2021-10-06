import { Route } from '@vaadin/router';
import './views/main-layout';
import './views/todo/todo-view';
import './views/list/list-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'todo-view',
    icon: '',
    title: '',
  },
  {
    path: 'todo',
    component: 'todo-view',
    icon: 'la la-list-alt',
    title: 'Todo',
  },
  {
    path: 'list',
    component: 'list-view',
    icon: 'la la-file',
    title: 'List',
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
