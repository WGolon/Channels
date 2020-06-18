Na wstępie chciałem tylko powiedzieć, że bardzo spoko to zadanko - praktyczne i konkretne. Fajna sprawa z tym UTM stampem np do sprawdzania skuteczności/klikalności poszczególnych reklam.

Opis dość obszerny ale wolałem w tą stronę przesadzić.

1. jakie przeglądarki i urządzenia zostały przetestowane,
2. jakie kompromisy zostały podjęte aby zapewnić funkcjonalność,
3. komentując zadanie oraz jego rozwiązanie, 



1. Rozwiązanie przetestowałem na przeglądarkach: Chrome, Edge, Opera i Firefox oraz sprawdziłem wyświetlanie na urządzeniach od szerokości 360px w górę. Użycie w css media queries na min-width sugeruje zastosowanie metodologi "mobile first", stąd rozumiem że layout pokazany na screenie "1280px.png" powinien obowiązywać do 1680px itd...
Dodatkowo najczęściej korzystam z prefixera online https://autoprefixer.github.io, który dopisuje prefixy do 4 ostatnich wersji przeglądarek.


2. Jeżeli chodzi o funkcjonalność, to wykonałem wszystko oprócz testów, których po prostu nigdy jeszcze nie pisałem ale po tym zadaniu zaczynam się ich uczyć. Udało mi się jednak wykonać routing po stronie serwera wysyłający plik channels.json. Trudno jest mi się wypowiedzieć w kwestii kompromisów, bo wydaje mi się, że dostarczyłem bezbłędnie wszystkie funkcjonalności. 

Jedynym kompromisem jaki dostrzegam jest fakt, że tablice z danymi najpierw sortuje, a później filtruje, co ze względu na ilość iteracji jest mniej wydajne niż odwrotny sposób. Jednak miałoby to znaczenie przy znacznie znaczniej większej liczbie danych, więc wybrałem drogę dla mnie łatwiejszą.

W kwestii sprawdzania danych z backendu, to w mojej opinii bez sensu walidować każdą zmienną. Lepiej z backend developerem omówić i popracować nad maksymalną "spójnością" wymienianych danych, a tam gdzie nie jesteśmy w stanie tego zapewnić trzeba walidować. Mówię tutaj o liczbach subskrypcji, wyświetleń i video - zwalidowanie ich nie było trudne ale zakładanie że każda przychodząca dana jest w złym formacie, nadłoży wiele pracy. (Wiem, że tutaj było to zrobione celowo ale przemyśleniami się podzielę ;) )


3. W aplikacji wykorzystałem mój setup z webpackiem (nie jest tutaj konieczny lecz ułatwia mi pracę). Wykorzystuję w nim również preprocesor CSS, oczywiście nie jest to framework ale jeżeli miało być ekstremalnie, to wykorzystywałem tylko składnie CSS (bez zagnieżdżania klas, mixinów, czy deklarowania zmiennych za pomocą $zmienna). 


Zazwyczaj aplikację dzielę na kontroler interfejsuAplikację podzieliłem na główny plik zarządzający index.js i plik UI_Controller.js z funkcjami edytującymi interfejs użytkownika. Można oczywiście dodać osobny plik z samymi selektorami i plik zawierający funkcje do "obróbki" danych, wtedy index.js będzie pełnił rolę "wywoływacza" tych funkcji i trzymał stan (danych) aplikacji. Jednak w tym wypadku uznałem, że będzie to przerost formy nad treścią. 

Komentarz do rozwiązania:
Za pomocą biblioteki axios pobierane są dane z serwera (channels.json), axios zwraca promise, więc kod w .catch wykonywany jest asynchronicznie (dane tam trafiające zostają automatycznie parsowane). Jeżeli udało się pobrać dane z serwera, zostają skopiowane i poddane walidacji (usunięcie przecinków kropek i spacji z kilku właściwości), a następnie wyświetlone użytkownikowi. Tablice data jak i arrToDisplay odzwierciedlają stan aplikacji i przechowują odpowiednio zwalidowane dane i dane które obecnie są wyświetlane. Klikając na dowolną opcję sortowania, program sprawdza który label został naciśnięty i odwołuje się do jego atrybutu data-sort-type, który przechowuje nazwę właściwości obiektu, po której należy sortować. Przycisk sort odpowiada za odwrócenie tablicy dzięki metodzie .reverse(). Przycisk clear odpowiada za wyczyszczenie wszystkich filtrów i trybów sortowania, wyświetlone zostają dane z tablicy data. Na koniec każdej funkcji sortującej wywoływana jest funkcja filtrująca która zwraca nową tablicę z danymi które w tytule posiadają ciąg znaków z input filter. Jeżeli owy input jest pusty, wyświetla tylko posortowane dane. Dalej tworzona jest tablica z sugestiami nazw kanałów spełniających dane filtry. Sugestie te wyświetlane są dynamicznie jak i dynamicznie dopisany jest do nich eventListener, po kliknięciu na sugestię do pola input filter trafia nazwa sugestii i wyświetlany jest wyłącznie jeden kanał. Kliknięcie w dowolne miejsce poza polem z sugesitami, przestaje je wyświetlać. 

Każdy kafelek z kanałem wyświetlany jest dynamicznie i dynamicznie zostaje do niego dopisany eventListener. Po kliknięciu na kafelek wywoływana jest funkcja dodająca na koniec atrybutu href daną utm_stamp= aktualny_czas, a następnie link otwierany jest w nowej karcie.

Dane do LocalStorage trafiają jako obiekt zawierający datę obecnej i ostatniej wizyty jak i licznik odsłon. Jeżeli odwiedzamy stronę pierwszy raz, to tworzona jest nowa dana bez informacji o ostatniej wizycie. Jeżeli dana istnieje, to zostaje pobrana, parsowana, data ostatniej wizyty staje się datą obecnej wizyty, a data obecnej wizyty nadpisywana jest teraźniejszym znakiem czasu i inkrementowany zostaje licznik wizyt. Tak przygotowany obiekt zostaje spowrotem przekonwertowany na format JSON i spowrotem wpisany do localStorage. Aktualny czas w zadanym formacie został wygenerowany za pomocą biblioteki moment.js.

Po naciśnięciu przycisku Black/White do atrybutu data-theme w znaczniku html trafia odpowiednio string "Black" lub "White". W arkuszu stylów CSS, stałe przechowujące kolory są odpowiednio nadpisywane nowymi, zawierającymi ciemny bądź jasny kolor.


