class MGOState {
    static Waiting = new MGOState('Waiting');
    static Destroyed = new MGOState('Destroyed');
    static InInventory = new MGOState('InInventory');
    static InZone = new MGOState('InZone');
    //used when an action applies to any state. Eg Destroy
    static Any = new MGOState('Any');
  
    constructor(name) {
      this.name = name;
    }
}

class MGOAction {
    static Drop = new MGOTransition('Drop');
    //DropTo implies giving object to another (has inventory)
    static DropTo = new MGOTransition('DropTo');
    static Pickup = new MGOTransition('Pickup');
    static Destroy = new MGOTransition('Destroy');
    static Work = new MGOTransition('Work');
    static Use = new MGOTransition('Use');
}

/*
example sm:
const wordMachine = createMachine({
  states: {
    bold: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_BOLD: 'off' }
        },
        off: {
          on: { TOGGLE_BOLD: 'on' }
        }
      }
    },
    underline: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_UNDERLINE: 'off' }
        },
        off: {
          on: { TOGGLE_UNDERLINE: 'on' }
        }
      }
    },
    italics: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_ITALICS: 'off' }
        },
        off: {
          on: { TOGGLE_ITALICS: 'on' }
        }
      }
    },
    list: {
      initial: 'none',
      states: {
        none: {
          on: { BULLETS: 'bullets', NUMBERS: 'numbers' }
        },
        bullets: {
          on: { NONE: 'none', NUMBERS: 'numbers' }
        },
        numbers: {
          on: { BULLETS: 'bullets', NONE: 'none' }
        }
      }
    }
  }
});

const boldState = wordMachine.transition('bold.off', 'TOGGLE_BOLD').value;

// {
//   bold: 'on',
//   italics: 'off',
//   underline: 'off',
//   list: 'none'
// }

const nextState = wordMachine.transition(
  {
    bold: 'off',
    italics: 'off',
    underline: 'on',
    list: 'bullets'
  },
  'TOGGLE_ITALICS'
).value;

// {
//   bold: 'off',
//   italics: 'on',
//   underline: 'on',
//   list: 'bullets'
// }
*/

class Flow{
    constructor(startState, transitionEvent, endState){
        this.startState = startState;
        this.transitionEvent = transitionEvent;
        this.endState = endState;
    }
}

let resourceFSM = new StateMachine(MGOState.Waiting,
    {states: [
        new Flow(MGOState.Waiting,MGOAction.Pickup,MGOState.InInventory),
        new Flow(MGOState.InInventory,MGOAction.Drop,MGOState.Waiting),
        new Flow(MGOState.InInventory,MGOAction.DropTo,MGOState.InInventory),
        

        new Flow(MGOState.Any,MGOAction.Destroy,MGOState.Destroyed)

    ]
    }
)