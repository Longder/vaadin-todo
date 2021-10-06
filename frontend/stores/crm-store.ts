import {makeAutoObservable, observable, runInAction} from 'mobx';

import Company from 'Frontend/generated/com/longder/application/data/entity/Company';
import Contact from 'Frontend/generated/com/longder/application/data/entity/Contact';
import Status from 'Frontend/generated/com/longder/application/data/entity/Status';
import * as endpoint from 'Frontend/generated/CrmEndpoint';

export class CrmStore {
    contacts: (Contact | undefined)[] | undefined = [];
    companies: (Company | undefined)[] | undefined = [];
    statuses: (Status | undefined)[] | undefined = [];

    constructor() {
        /**
         * 使用MobX初始化状态管理
         * 使用这个方法，会把当前类变为“可被观察的”
         * 方法第二个参数，指定哪些需要“被观察”
         * all fields are made into observed values,
         * all functions into actions,
         * and all getters into computed values
         */
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                contacts: observable.shallow,
                companies: observable.shallow,
                statuses: observable.shallow,
            },
            {autoBind: true}
        );

        this.initFromServer();
    }

    async initFromServer() {
        const data = await endpoint.getCrmData();

        /**
         * Observables need to be updated through actions
         * 状态需要通过action来更新
         * runInAction方法，手动的去触发action，参数传递的是callback
         */
        runInAction(() => {
            this.contacts = data?.contacts;
            this.companies = data?.companies;
            this.statuses = data?.statuses;
        });
    }
}