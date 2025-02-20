<template>

    <div class="boarding-pass" :class="{ 'has-data': hasData }">
        <div class="head">
            <h1>BOARDING PASS</h1>
            <font-awesome class="plane-icon" icon="plane" />
            <div class="sub align-center">
                <h2>BOARDING PASS</h2>
            </div>
        </div>
        <div class="main">
            <Barcode class="barcode-container" v-if="hasData" side></Barcode>
            <div v-if="!hasData" class="input-box">
                <h3>ENTER FLIGHT NUMBER</h3>
                <input v-model="flight_number" type="text" placeholder="Example: UA237">
                <FancyBtn @click="getFlightStatus(flight_number)" :hold="inflight" class="btn-container">CHECK STATUS
                </FancyBtn>
            </div>
            <div v-if="hasData" class="flex-col between">
                <div class="flex gap-30">
                    <div class="area-box">
                        <h3>FROM</h3>
                        <h1 class="ocr">{{ flight_data.departure }}</h1>
                    </div>
                    <div class="area-box ml-auto mr-50">
                        <h3>TO</h3>
                        <h1 class="ocr">{{ flight_data.destination }}</h1>
                    </div>
                </div>

                <div class="flex mb-10 gap-30">
                    <div class="area-box">
                        <h3>STATUS</h3>
                        <div class="status">
                            <font-awesome class="ind" icon="circle-exclamation" />
                            {{ flight_data.status }}
                        </div>
                    </div>
                    <div class="area-box ml-auto mr-50">
                        <h3>NOW DEPARTING</h3>
                        <h2 class="ocr">{{ flight_data.departure_time }}</h2>
                    </div>
                </div>
                

            </div>
            <div class="sub">
                <div v-if="hasData" class="flex-col w-100 gap-20 align-center">
                    <h3 class="text-center">{{ flight_data.flight_number }}</h3>

                    <div class="graphic">
                        <div class="stop">
                            <div class="pinpoint"></div>

                        </div>
                        <div class="plane">
                            <font-awesome class="plane" icon="plane" />
                        </div>
                        <div class="stop">
                            <div class="pinpoint"></div>
                        </div>
                    </div>

                    <a href="https://google.com" target="_blank">More data about this flight?</a>
                </div>
                <div class="filler"></div>
                <div class="filler"></div>
            </div>

        </div>

        <div class="dotted-line">
            <div v-for="i in 14" class="dot" :class="{ white: i <= 4, last: i == 14 }"></div>
        </div>
    </div>

</template>


<script setup lang="ts">

interface FlightData {
    departure?: string,
    destination?: string,
    flight_number?: string,
    departure_time?: string,
    status?: string
}

const hasData = ref<Boolean>(false);

const flight_number = ref<string>('');
const inflight = ref<boolean>(false);

const flight_data: Ref<FlightData> = ref({});

async function getFlightStatus(fl_num: string) {
    inflight.value = true;

    try {
        // Use a standard fetch call instead of useFetch
        const response = await fetch('/api/getFlightStatus?flight_number=' + fl_num);
        const data = await response.json();

        if (data) {
            flight_data.value = data
            hasData.value = true
            console.log(flight_data.value)
        }
    } catch (error) {
        console.error(error);
    } finally {
        inflight.value = false;
    }
}

</script>



<style scoped lang="scss">
$text-lg: 30px;
$text-md: 156px;
$text-sm: 12px;


.flex {
    display: flex;
}

.text-center {
    text-align: center;
}

.align-center {
    align-items: center;
}

.gap-30 {
    gap: 40px;
}

.gap-20 {
    gap: 20px;
}

.mb-10 {
    margin-bottom: 10px;
}


.flex-col {
    display: flex;
    flex-direction: column;
}

.between {
    justify-content: space-between;
}

.boarding-pass {
    width: 627px;
    height: 269px;
    background-color: #F1F7FE;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 0px 0px #C7C7C7;
    position: relative;


    .head {
        width: 100%;
        height: 65px;
        flex-shrink: 0;
        background-color: #6C9BE1;
        border-radius: 10px 10px 0 0;
        padding: 30px;
        display: flex;
        align-items: center;
        gap: 25px;
    }

    .main {
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-bottom: auto;
        display: flex;
        padding: 30px;
        padding-top: 20px;
    }

    .sub {
        width: 135px;
        height: 100%;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .w-100 {
        width: 100%;
    }

    .input-box {
        display: flex;
        flex-direction: column;
        gap: 5px;

        input {
            box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
            border: 2px solid black;
            width: 247px;
            height: 47px;
            padding: 10px;
            font-size: $text-sm;
            font-family: 'OCR-B';
            outline: none;
            transition: border 0.1s ease-in-out;

            &:focus {
                border: 2px solid #6C9BE1;
            }

            &::placeholder {
                color: #B4B4B4;
            }
        }
    }

    .area-box {
        display: flex;
        flex-direction: column;
        width: 50%;
        white-space: nowrap;

    }

    .dotted-line {
        height: 100%;
        width: 10px;
        position: absolute;
        left: 68%;
        top: -5px;
        display: flex;
        flex-direction: column;
        gap: 10.8px;

        .dot {
            width: 10px;
            height: 10px;
            background-color: #DEE8F3;
            border-radius: 50%;
            flex-shrink: 0;

            &.white {
                background: white;
            }

            &.last {
                visibility: none;
                position: relative;
                background-color: transparent;

                &::before {
                    content: '';
                    display: flex;
                    width: 10px;
                    height: 5px;
                    background-color: #C7C7C7;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }

                &::after {
                    content: '';
                    display: flex;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: white;
                    position: absolute;
                    top: 3px;
                    left: 2px;
                    z-index: 0;
                }
            }
        }
    }

    .status {
        font-size: 14px;
        padding: 7px 12px;
        background: #FFCACA;
        font-weight: 600;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 8px;
        .ind {
            font-size: 13px;
        }
    }

}

h1 {
    font-size: $text-lg;
    color: white;
    font-weight: 600;
    margin: 0;

    &.ocr {
        color: #193A38;
        font-family: 'OCR-B';
    }
}

h2 {
    font-size: 16px;
    color: white;
    margin: 0;
    &.ocr {
        color: #193A38;
        font-family: 'OCR-B';
    }
}

h3 {
    font-size: 12px;
    font-family: 'OCR-B';
    color: #7F7F7F;
    margin: 0;
    margin: 0;
}

h4 {
    font-size: 10px;
    font-family: 'OCR-B';
    margin: 0;
}

.plane-icon {
    color: white;
    font-size: 25px;
}


.btn-container {
    margin-top: auto;
    margin-right: auto;
}

.barcode-container {
    margin-right: 25px;
}



.graphic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
    .stop {
        display: flex;
        flex-direction: column;
        .pinpoint {
            width: 14px;
            height: 14px;
            background-color: #193A38;
            border-radius: 50%;
            z-index: 1;
        }
        &:last-of-type .pinpoint {
            background-color: #DEE8F3;
        }
    }
    .plane {
        color: #DEE8F3;
        font-size: 30px;
        &::before {
            position: absolute;
            display: flex;
            content: '----';
            left: 0;
            z-index: 0;
            top: -2px;

        }
        &::after {
            position: absolute;
            display: flex;
            content: '----';
            right: 0;
            z-index: 0;
            top: -2px;

        }
    }
}

.btn {
    margin-top: 10px;
    width: 120px;
    height: 30px;
    border: none;
    background-color: #6C9BE1;
    color: white;
    font-size: 10px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #3d7dde;
    }
}

a {
    position: absolute;
    bottom: 15px;
    font-size: 10px;
    color: #0040FF;
    font-weight: 600;
}

.mt-5 {
    margin-top: 5px;
}
.mt-7 {
    margin-top: 7px;
}

.filler {
    background-color: #DEE8F3;
    width: 100%;
    height: 13px;
    border-radius: 3px;
    margin-top: 7px;
}

.has-data .filler:nth-last-of-type(2) {
    margin-top: 15px;
    
}


</style>