DEFAULT_GENRES = [
    "drama",
    "action",
    "adventure",
    "biographical",
    "buddy",
    "gangster",
    "fantasy",
    "comedy",
    "war",
    "historical",
    "romance",
    "horror",
]


def parse_request(request_dict):
    parsed_request = {}
    if len(request_dict["Genres"]) > 0:
        parsed_request["selected_genre"] = request_dict["Genres"]
    else:
        parsed_request["selected_genre"] = DEFAULT_GENRES

    parsed_request["star"] = request_dict["Actor"]
    if type(request_dict["Year"]) != int:
        parsed_request["date"] = int(request_dict["Year"])
    else:
        parsed_request["date"] = 0
    parsed_request["country"] = request_dict["Country"]
    parsed_request["director"] = request_dict["Director"]
    return parsed_request


def get_imdb_ids(request_dict):
    # TODO : use the request_dict to get the movie ids list
    return ["tt0120737", "tt0167261", "tt0167260"]  # Mock list for now
