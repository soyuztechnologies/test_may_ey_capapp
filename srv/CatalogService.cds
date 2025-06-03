using { anubhav.db.master, anubhav.db.transaction } from '../db/datamodel';
using { cappo.cds } from '../db/CDSViews';


service CatalogService @(path: 'CatalogService') {
    //demo
    entity EmployeeSet as projection on master.employees;
    entity AddressSet as projection on master.address;
    
    function getOrderDefault() returns POs;
    entity POs @(odata.draft.enabled: true,
                 Common.DefaultValuesFunction: 'getOrderDefault' ) as projection on transaction.purchaseorder{
        *,
        case OVERALL_STATUS
          when 'N' then 'New'
          when 'P' then 'Pending'
          when 'D' then 'Delivered'
          when 'A' then 'Approved'
          when 'X' then 'Rejected'
        end as OverallStatus: String(10),
        case OVERALL_STATUS
         when 'N' then 2
          when 'P' then 2
          when 'D' then 3
          when 'A' then 3
          when 'X' then 1
        end as IconColor: Integer
    }
    actions{
        action boost() returns POs;
        action setOrderStatus() returns POs;
    };

   
    function getLargestOrder() returns POs;
    entity POItems as projection on transaction.poitems;
    entity BusinessPartnerSet as projection on master.businesspartner;
    entity ProductSet as projection on master.product;

    //entity ProdItems as projection on cds.CDSViews.ItemView;
    //entity ProductSet as projection on cds.CDSViews.ProductView;

}