package com.longder.application.data.endpoint;

import com.longder.application.data.entity.Company;
import com.longder.application.data.entity.Contact;
import com.longder.application.data.entity.Status;
import com.longder.application.data.repository.CompanyRepository;
import com.longder.application.data.repository.ContactRepository;
import com.longder.application.data.repository.StatusRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class CrmEndpoint {
    private final ContactRepository contactRepository;
    private final CompanyRepository companyRepository;
    private final StatusRepository statusRepository;


    public CrmEndpoint(ContactRepository contactRepository, CompanyRepository companyRepository, StatusRepository statusRepository) {
        this.contactRepository = contactRepository;
        this.companyRepository = companyRepository;
        this.statusRepository = statusRepository;
    }

    /**
     * DTO封装数据
     */
    public static class CrmData {
        public List<Contact> contacts;
        public List<Company> companies;
        public List<Status> statuses;
    }

    /**
     * 查询获取所有数据
     */
    public CrmData getCrmData() {
        CrmData crmData = new CrmData();
        crmData.contacts = contactRepository.findAll();
        crmData.companies = companyRepository.findAll();
        crmData.statuses = statusRepository.findAll();
        return crmData;
    }

    /**
     * 保存一个联系人
     */
    public Contact saveContact(Contact contact) {
        contact.setCompany(companyRepository.findById(contact.getCompany().getId())
                .orElseThrow(() -> new RuntimeException("Could not find Company with id" + contact.getCompany().getId())));
        contact.setStatus(statusRepository.findById(contact.getStatus().getId())
                .orElseThrow(() -> new RuntimeException("Could not find Status with id" + contact.getStatus().getId())));
        return contactRepository.save(contact);
    }

    /**
     * 删除一个联系人
     */
    public void deleteContact(Integer contactId) {
        contactRepository.deleteById(contactId);
    }
}
