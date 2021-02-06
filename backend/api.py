from qwikidata.sparql import return_sparql_query_results

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

def write_request(request_dict):
    selected_genre=request_dict["selected_genre"]
    date=str(request_dict["date"])
    req_country=request_dict["country"]
    star=request_dict["star"]
    director=request_dict["director"]

    #possible_countries=["United States", "Italy", "France", "India", "Germany", "United Kingdom", "Canada", "Japan", "Spain"]
    countries=['Q30','Q38','Q142','Q668','Q183','Q145','Q16','Q17','Q29']

    country=countries[req_country]

    g=len(selected_genre)


    request="""PREFIX q: <http://www.wikidata.org/prop/qualifier/>
    PREFIX s: <http://www.wikidata.org/prop/statement/>

    SELECT DISTINCT ?imdb 
    WHERE {
      ?movie wdt:P345 ?imdb  .
      FILTER (SUBSTR(?imdb,1,2)='tt') .
      ?movie wdt:P31 wd:Q11424;
            wdt:P495 wd:"""+country + """;

            p:P577 ?placeofpublication.

      ?placeofpublication q:P291 wd:"""+country+""". 
      ?placeofpublication s:P577 ?publicationdate.
      ?movie wdt:P161 [rdfs:label ?star].
    FILTER REGEX( ?star, '""" + star+"""', 'i').  
      FILTER LANGMATCHES( LANG(?star), 'en').
      
      ?movie wdt:P57 [rdfs:label ?director].
      FILTER REGEX( ?director, '"""+ director+ """', 'i'). 
    FILTER LANGMATCHES( LANG(?director), 'en').
      
        ?movie wdt:P136 [rdfs:label ?genre].
        """  
    if g>0:
      request+="FILTER (REGEX( ?genre,'"
      for i in range(g-1):
        request+=selected_genre[i]+"', 'i')||REGEX( ?genre,'"
        request
      request+=selected_genre[g-1]+"', 'i'))."
    request+=    """
    FILTER LANGMATCHES( LANG(?genre), 'en').
    FILTER (YEAR(?publicationdate) = """+date+""").

        
    
    }
    LIMIT 30"""


    return request 


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
        
    parsed_request["country"] = int(request_dict["Country"])
    parsed_request["director"] = request_dict["Director"]
    return parsed_request



def get_imdb_ids(request_dict):
    query_string=write_request(request_dict)
    print(query_string)
    results = return_sparql_query_results(query_string)
    imdb_ids=[]
    for binding in results['results']['bindings']:
        imdb_ids.append(binding['imdb']['value'])
    return imdb_ids