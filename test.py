import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to server')

@sio.event
def disconnect():
    print('Disconnected from server')

@sio.event
def bookList(bookList):
    print(f'Received book list: {bookList}')

sio.connect('http://localhost:4000')

sio.wait()
