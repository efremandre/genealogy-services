`features/auth/model`  

* query keys  
* hooks на базе TanStack Query  
* логика logout  
* auth guards  
* типы User, LoginPayload, RegisterPayload  

``` features/auth/model ```  

#### Отвечает за то, как auth живет внутри приложения:  

* useLoginMutation  
* useRegisterMutation  
* useMeQuery  
* useLogout  
* authKeys  

То есть тут уже связка:  
API + TanStack Query + клиентская логика  