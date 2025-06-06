from django.urls import path,include
from .views import homePage,DataViewSet,register_event,EventPage,CreateEventView,AdminPage,SignupView, LoginView, LogoutView,testPage,TicketRegistrationViewSet,DashboardPage
from rest_framework.routers import DefaultRouter
 
 

router = DefaultRouter()
router.register(r'eventItems', DataViewSet)  
router.register(r'registerevent', TicketRegistrationViewSet,basename='registerevent')  
 



urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),


path('testpage/',testPage,name='test'),
path('admin/',AdminPage,name='admin'),
   path('',homePage,name='home'),
   path('events/',EventPage,name='events'),
   path('create-events/', CreateEventView.as_view(),name='create'),
   path('dashboard/', DashboardPage.as_view(),name='dashboard'),


   path('api/', include(router.urls)), 

   path('testing/<int:event_id>', register_event), 


]
