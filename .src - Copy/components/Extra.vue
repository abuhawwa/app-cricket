<template>
  <div class="extra">
    <form id="modalForm" autocomplete="off">
      <div class="mb-3">
        <h6 class="fw-bold">Byes</h6>
        <ul class="list-inline">
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="byes"
              id="oneBye"
              autocomplete="off"
              value="bye-1"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="oneBye">1b</label>
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="byes"
              id="twoByes"
              autocomplete="off"
              value="bye-2"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="twoByes">2b</label>
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="byes"
              id="threeByes"
              autocomplete="off"
              value="bye-3"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="threeByes">3b</label>
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="byes"
              id="fourByes"
              autocomplete="off"
              value="bye-4"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="fourByes">4b</label>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <h6 class="fw-bold">Leg Byes</h6>
        <ul class="list-inline">
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="legByes"
              id="oneLegBye"
              autocomplete="off"
              value="legBye-1"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="oneLegBye">1lb</label>
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="legByes"
              id="twoLegByes"
              autocomplete="off"
              value="legBye-2"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="twoLegByes">2lb</label>
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="legByes"
              id="threeLegByes"
              autocomplete="off"
              value="legBye-3"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="threeLegByes"
              >3lb</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="legByes"
              id="fourLegByes"
              autocomplete="off"
              value="legBye-4"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="fourLegByes">4lb</label>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <h6 class="fw-bold">Wides</h6>
        <ul class="list-inline">
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="wide"
              id="wide"
              autocomplete="off"
              value="wide-1"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="wide"
              >wd<br />&nbsp;</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="wide"
              id="widePlusOne"
              autocomplete="off"
              value="wide-2"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="widePlusOne"
              >wd<br />+1</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="wide"
              id="widePlusTwo"
              autocomplete="off"
              value="wide-3"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="widePlusTwo"
              >wd<br />+2</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="wide"
              id="widePlusThree"
              autocomplete="off"
              value="wide-4"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="widePlusThree"
              >wd<br />+3</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="wide"
              id="widePlusFour"
              autocomplete="off"
              value="wide-5"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="widePlusFour"
              >wd<br />+4</label
            >
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <h6 class="fw-bold">No Balls</h6>
        <ul class="list-inline">
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBall"
              id="nb"
              autocomplete="off"
              value="noBall-1"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="nb"
              >nb<br />&nbsp;</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBall"
              id="nbPlusOne"
              autocomplete="off"
              value="noBall-2"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="nbPlusOne"
              >nb<br />+1</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBall"
              id="nbPlusTwo"
              autocomplete="off"
              value="noBall-3"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="nbPlusTwo"
              >nb<br />+2</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBall"
              id="nbPlusThree"
              autocomplete="off"
              value="noBall-4"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="nbPlusThree"
              >nb<br />+3</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBall"
              id="nbPlusFour"
              autocomplete="off"
              value="noBall-5"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-outline-primary" for="nbPlusFour"
              >nb<br />+4</label
            >
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <h6 class="fw-bold">No Balls off the bat</h6>
        <ul class="list-inline">
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBallBat"
              id="nbOneRun"
              autocomplete="off"
              value="noBallRun-2"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-sm btn-outline-primary" for="nbOneRun"
              >nb<br />+1run</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBallBat"
              id="nbTwoRuns"
              autocomplete="off"
              value="noBallRun-3"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-sm btn-outline-primary" for="nbTwoRuns"
              >nb<br />+2run</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBallBat"
              id="nbThreeRuns"
              autocomplete="off"
              value="noBallRun-4"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-sm btn-outline-primary" for="nbThreeRuns"
              >nb<br />+3run</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBallBat"
              id="nbFourRuns"
              autocomplete="off"
              value="noBallRun-5"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-sm btn-outline-primary" for="nbFourRuns"
              >nb<br />+4run</label
            >
          </li>
          <li class="list-inline-item">
            <input
              type="radio"
              class="btn-check"
              name="noBallBat"
              id="nbSixRuns"
              autocomplete="off"
              value="noBallRun-7"
              @change="$emit('extra', $event.target.value)"
            />
            <label class="btn btn-sm btn-outline-primary" for="nbSixRuns"
              >nb<br />+6run</label
            >
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Extra",
  emits: ["extra"],
};
</script>

<style>
</style>