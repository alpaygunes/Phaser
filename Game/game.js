'use strict'

class Game{
    currentHalka; 
    enemies = []; 
    player; 
}

class Cell{ 
    key;
    r;
    x;
    y;
    path;
    opitons;
    selected;

}

class player{
    directionOfMovement = 'cw || cww';
    key;
    speed;
}

class enemi{
    directionOfMovement = 'cw || cww';
    key;
    speed;
}


class bomb{ 
    key; 
    position;
}

class reward{ 
    key; 
    point;
    locatedCell
}