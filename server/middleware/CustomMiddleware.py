from django.middleware.common import MiddlewareMixin

class CORSMIDDLWARE(MiddlewareMixin):
    def process_response(self, request, response):
        response['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        response['Access-Control-Allow-Credentials'] = 'true'
        return response