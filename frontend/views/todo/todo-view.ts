import { css,html,LitElement } from 'lit';
import { customElement,state } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import {Binder,field} from '@vaadin/form';
import {TodoEndpoint} from "Frontend/generated/TodoEndpoint";
import Todo from "Frontend/generated/com/longder/application/data/entity/Todo";
import TodoModel from "Frontend/generated/com/longder/application/data/entity/TodoModel";


@customElement('todo-view')
export class TodoView extends LitElement {

    // 用state注解声明，ui可以响应此数据的变化
    @state()
    private todos:Todo[] = [];
    // Binder是vaadin用来做表单状态绑定的对象，主要包括数据类型的描述和校验
    private binder = new Binder(this,TodoModel);

    // 样式定义
    static styles = css`
        :host{
            display: block;
            padding: var(--lumo-space-m) var(--lumo-space-l)
        }
    `;

    // 渲染页面模板 JSX写法
    render(){
        return html`
            <div class="form">
                <!--绑定这个域到模型的task属性中-->
                <vaadin-text-field ...="${field(this.binder.model.task)}"></vaadin-text-field>
                <!--提交创建todo的按钮-->
                <vaadin-button theme="primary" @click="${this.createTodo}" 
                               ?disabled="${this.binder.invalid}">添加</vaadin-button>       
            </div>
            <!--todo列表-->
            <div class="todos">
                ${this.todos.map((todo)=>html`
                    <div class="todo">
                        <vaadin-checkbox ?checked="${todo.done}" 
                                         @checked-changed="${(e:CustomEvent)=>
                                                 this.updateTodoState(todo,e.detail.value)
                                }"></vaadin-checkbox>
                        <span>${todo.task}</span>
                    </div>
                `)}
            </div>
        `;
    }

    // lifecycle callback
    async connectedCallback(){
        super.connectedCallback();
        // @ts-ignore
        this.todos = await TodoEndpoint.findAll();
    }

    // 创建一个todo
    async createTodo(){
        const createdTodo = await this.binder.submitTo(TodoEndpoint.save);
        if(createdTodo){
            this.todos = [...this.todos,createdTodo];
            this.binder.clear();
        }
    }

    // 更新todo状态
    updateTodoState(todo:Todo,done:boolean){
        const updatedTodo = {...todo,done};
        // 前端更新？？
        this.todos = this.todos.map((t)=>(t.id===todo.id?updatedTodo:t));
        // 保存后端
        TodoEndpoint.save(updatedTodo);
    }
}
