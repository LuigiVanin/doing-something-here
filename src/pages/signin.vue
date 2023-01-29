<template lang="">
    <FormKit type="form" @submit="submitEvent($event)">
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="nanna"
            :validation="[['required'], ['length', 3, 150], ['email']]"
            value="luisfvanin@gmail.com"
        />
        <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required"
            validation-visibility="live"
            value="senha123"
        />
        <!-- <button @click="createAccount()">signup</button> -->
    </FormKit>
</template>
<script lang="ts" setup></script>
