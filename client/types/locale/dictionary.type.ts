// types/dictionary.ts

interface IFSection {
  title: string;
  description: string;
}

export interface IDictionary {
  top_navbar: {
    become_seller: string;
    login_as_seller: string;
  };
  middle_navbar: {
    search_placeholder: string;
    login:string
    register:string
    user_nav: {
      orders?: string;
      wishlist?: string;
      login_out?: string;
      dashboard?: string;
    };
  };
  bottom_navbar: {
    pages: {
      home: string;
      products: string;
      flash_sale: string;
      categories: string;
      brands: string;
      contact: string;
    };
    categories: {
      title: string;
      see_all: string;
      women: string;
      men: string;
      computer: string;
      automobile: string;
      kids: string;
      sports: string;
      jewelry: string;
      cellphones: string;
      beauty: string;
      home: string;
      all: string;
    };
  };
  footer: {
        tag_line:string
        social_title: string
        quick_links: {
            title: string
            link1: string
            link2: string
            link3: string
            link4: string
            link5: string
            link6: string
        }
        contacts: {
            title: string
            address: string
            phone: string
            email: string
        }
        my_account: {
            title: string
            link1: string
            link2: string
            link3: string
            link4: string
            link5: string
        }
        seller_zone: {
            title: string
            link1: string
            link2: string
            link3: string
        }
        copyright: string
  }
  home: {
    featured_products: IFSection & { button: string };
    features_section: {
      title: string;
      description: string;
      feature1: IFSection;
      feature2: IFSection;
      feature3: IFSection;
      feature4: IFSection;
    };
    categories_section: {
      title: string;
      description: string;
      item1: string;
      item2: string;
      item3: string;
      item4: string;
      item5: string;
      item6: string;
    }
    seller_cta_section: {
        title: string;
        description: string;
        item1: string;
        item2: string;
        item3: string;
        button: string;
    }
    testimonial_section: IFSection;
  };
  products:{
    product_title:string
    flash_sale_title:string
    products_card:{
      buy_now:string
      add_to_cart:string
    }
  }
  categories:{
    title:string
  }
  brands:{
    title:string
  }
  contact:{
    title:string
    description:string
    address:string
    phone:string
    email:string
    form:{
      name:string
      namePlaceholder:string
      email:string
      emailPlaceholder:string
      phone:string
      phonePlaceholder:string
      optional:string
      message:string
      messagePlaceholder:string
      button:string
    }
  }
  cart:{
    order_summary:string
    total_products:string
    sub_total:string
    empty:string
    item:string
    tax:string
    shipping:string
    total:string
    you_saved:string
    button:string
    color:string
    size:string
    warranty_included:string
  }
  checkout:{
    order_summary:string
    sub_total:string
    empty:string
    continue_shopping:string
    items:string
    tax:string
    ship:string
    shipping:string
    total:string
    you_saved:string
    button:string
    loading_button:string
    form:{
      title:string
      full_name:string
      full_name_placeholder:string
      phone_number:string
      phone_number_placeholder:string
      address:string
      address_placeholder:string
      city:string
      city_placeholder:string
      postal_code:string
      postal_code_placeholder:string
      order_note:string
      order_note_placeholder:string
      optional:string
      payment:{
        title:string
        method1:string
      }
    }
  }
  orders:{
    title:string
    order_id:string
    return_order:string
    cancel_order:string
    order_placed:string
    no_brand:string
    tabs:{
      tab1:string
      tab2:string
      tab3:string
      tab4:string
      tab45:string
    }
    status:{
      processing:string
      completed:string
      on_hold:string
      canceled:string
      delivered:string
    }
    empty_orders:{
      title:string
      description:string
      button:string
    }
    
  }
  wishlist:{
    title:string
    description:string
    cta:{
      title:string
      button:string
    }
  }
}
