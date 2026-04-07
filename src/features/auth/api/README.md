```features/auth/api```  

* функции register, login, getMe  
* если хочешь, можно держать их не в shared/api, а именно тут, потому что они относятся к auth-домену  

``` features/auth/api ```  

##### Отвечает за конкретные auth-запросы:  

* registerUser  
* loginUser  
* getMe  
* возможно logoutUser, если серверная ручка реально есть  

Это уже доменный API-слой.  