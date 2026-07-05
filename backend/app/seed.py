QUOTES = [
    "Good morning beeru 😁 tu bou juthu bole che pela kye rate vaat karis pan kari j nai 😡 have hu tara thi gusse chu tare mane manavu padse 🥺 mane call kar j aje bou late thay jase suvama toh mane uthi n call kr j",
]

CHOCOLATES = [
    {"name": "TABS Dark Chocolate 🤤", "compliment": "Yeh chocolate sirf tumhare liye, agr chocolate ke name se pata na chale toh ak baar search kar lena 🤣"},
]


def get_random_quote():
    import random
    return random.choice(QUOTES)


def get_random_chocolate():
    import random
    return random.choice(CHOCOLATES)
