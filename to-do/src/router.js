import { createRouter, createWebHashHistory} from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import ViewTask from './components/ViewTask.vue';
import CreateTask from './components/CreateTask.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HeaderComponent},
        { path: '/view/:id', component: ViewTask, props: true},
        { path: '/create/:id', component: CreateTask, props: true}
    ]
})