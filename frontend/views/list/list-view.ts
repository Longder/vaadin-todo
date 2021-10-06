import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from '../../views/view';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import "./contact-form";
import {crmStore} from 'Frontend/stores/app-store';
import {listViewStore} from "Frontend/views/list/list-view-store";

@customElement('list-view')
export class ListView extends View {
    // 样式定义
    static styles = css`
        list-view contact-form {
            flex-shrink: 0;
            width: 35em;
        }
    `;

    render() {
        return html`
            <div class="toolbar gap-s">
                <vaadin-text-field
                        placeholder="姓名过滤"
                        .value=${listViewStore.filterText}
                        @input=${this.updateFilter}
                        clear-button-visible
                ></vaadin-text-field>
                <vaadin-button>添加联系人</vaadin-button>
            </div>
            <div class="content flex se-m h-full">
                <vaadin-grid class="grid h-full"
                             .items="${listViewStore.filteredContacts}"
                             .selectedItems=${[listViewStore.selectedContact]}
                             @active-item-changed=${this.handleGridSelection}>
                    <vaadin-grid-column path="firstName" auto-width>
                    </vaadin-grid-column>
                    <vaadin-grid-column path="lastName" auto-width>
                    </vaadin-grid-column>
                    <vaadin-grid-column path="email" auto-width>
                    </vaadin-grid-column>
                    <vaadin-grid-column
                            path="status.name"
                            header="状态"
                            auto-width
                    ></vaadin-grid-column>
                    <vaadin-grid-column
                            path="company.name"
                            auto-width
                            header="所在公司"
                    ></vaadin-grid-column>
                </vaadin-grid>
                <contact-form class="flex flex-col spacing-b-s"
                              ?hidden=${!listViewStore.selectedContact}></contact-form>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'box-border',
            'flex',
            'flex-col',
            'p-m',
            'spacing-b-s',
            'w-full',
            'h-full'
        );
    }

    updateFilter(e: { target: HTMLInputElement }) {
        listViewStore.updateFilter(e.target.value);
    }

    // vaadin-grid fires a null-event when initialized.
    // Ignore it.
    first = true;

    handleGridSelection(e: CustomEvent) {
        console.log("handleGridSelection!");
        if (this.first) {
            this.first = false;
            return;
        }
        listViewStore.setSelectedContact(e.detail.value);
    }
}
