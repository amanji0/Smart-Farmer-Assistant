class User:
    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email

    def login(self):
        print(f"Welcome back, {self.name}!")

class Captain(User):
    def __init__(self, name, phone, email, car_model):
        super().__init__(name, phone, email)
        self.car_model = car_model
        self.balance = 0.0
        self.rating = 5.0

    def complete_trip(self, amount):
        self.balance += amount
        print(f"Trip finished! New Balance: ${self.balance}")

class Passenger(User):
    def __init__(self, name, phone, email, location, payment_method):
        super().__init__(name, phone, email)
        self.location = location
        self.payment_method = payment_method

    def request_ride(self, destination):
        print(f"Looking for a captain to go to {destination}...")

p1 = Passenger("Mostafa", "01012345678", "mostafa@email.com", "Mansoura", "Cash")
p1.login()
p1.request_ride("Cairo")

print("-----------")

c1 = Captain("Mostafa", "01198765432", "ahmed@email.com", "Nissan Sunny")
c1.login()
c1.complete_trip(120)