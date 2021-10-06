import Contact from 'Frontend/generated/com/longder/application/data/entity/Contact';
import ContactModel from 'Frontend/generated/com/longder/application/data/entity/ContactModel';
import {crmStore} from 'Frontend/stores/app-store';
import {makeAutoObservable, observable} from 'mobx';

/**
 *
 */
class ListViewStore {
    filterText = '';
    selectedContact: Contact | null = null;

    /**
     * 重写了默认的observable模式
     */
    constructor() {
        makeAutoObservable(
            this,
            {selectedContact: observable.ref},
            {autoBind: true}
        );
    }

    /**
     * Action
     */
    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    /**
     * Action
     */
    setSelectedContact(contact: Contact) {
        this.selectedContact = contact;
    }

    get filteredContacts() {
        const filter = new RegExp(this.filterText, 'i');
        const contacts = crmStore.contacts;
        return contacts?.filter((contact) =>
            filter.test(`${contact?.firstName} ${contact?.lastName}`)
        );
    }

    /**
     * Action 创建新联系人
     */
    editNew() {
        this.selectedContact = ContactModel.createEmptyValue();
    }

    /**
     * Action 取消编辑
     */
    cancelEdit() {
        this.selectedContact = null;
    }
}

export const listViewStore = new ListViewStore();