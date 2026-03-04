import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  console.log("Interceptor está sendo chamado e executado");
  
  const token = localStorage.getItem('token');

  if(token){
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Token encontrado e adicionado ao header:", token);
    return next(cloned);
  }
  console.log("Não há token encontrado, continuando sem adicionar header de autorização.");
  return next(req);
};
