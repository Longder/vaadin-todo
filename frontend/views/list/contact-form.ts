import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from '../view';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';
import {Binder, field} from '@vaadin/form';
import ContactModel from 'Frontend/generated/com/longder/application/data/entity/ContactModel';
import {crmStore} from 'Frontend/stores/app-store';
import {listViewStore} from './list-view-store';

@customElement('contact-form')
export class ContactForm extends View {

    protected binder = new Binder(this, ContactModel);

    constructor() {
        super();
        this.autorun(() =>
            this.binder.read(
                listViewStore.selectedContact || ContactModel.createEmptyValue()
            )
        );
    }

    render() {
        const {model} = this.binder;
        return html`
            <vaadin-text-field label="First name" 
                               ...="${field(model.firstName)}"></vaadin-text-field>
            <vaadin-text-field label="Last name" 
                               ...="${field(model.lastName)}"></vaadin-text-field>
            <vaadin-text-field label="Email" 
                               ...="${field(model.email)}"></vaadin-text-field>
            <vaadin-combo-box label="状态" items=${crmStore.statuses}
                              ...="${field(model.status)}"></vaadin-combo-box>
            <vaadin-combo-box label="公司" .items=${crmStore.companies}
                              ...="${field(model.company)}"></vaadin-combo-box>
            <div class="spacing-e-s">
                <vaadin-button theme="primary">保存</vaadin-button>
                <vaadin-button theme="error">删除</vaadin-button>
                <vaadin-button theme="tertiary">取消</vaadin-button>
            </div>
        `;
    }
}